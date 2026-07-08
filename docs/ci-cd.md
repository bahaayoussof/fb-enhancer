# CI/CD Setup Guide — FB Enhancer

## Workflow Architecture

```
.github/workflows/
├── _build.yml      # Reusable: install → lint → build → ZIP → artifact
├── ci.yml          # Trigger: push/PR to main → calls _build.yml
└── release.yml     # Trigger: git tag v*.*.* → build → GitHub Release → Edge publish
```

### Flow diagram

```
Push tag v1.2.3
     │
     ▼
[_build.yml] Inject version → Lint → Build → ZIP → Upload artifact
     │
     ▼
[github-release] Download artifact → Create GitHub Release → Attach ZIP
     │
     ▼
[publish-edge] Get token → Upload to Edge draft → Wait → Submit for review
     │
     ▼ (when ready)
[publish-chrome] Get token → Upload to CWS → Publish  ← disabled, uncomment to enable
```

---

## Required GitHub Secrets

Go to: **Repository → Settings → Secrets and variables → Actions → New repository secret**

### Edge Add-ons (required)

| Secret               | Description                                    |
| -------------------- | ---------------------------------------------- |
| `EDGE_TENANT_ID`     | Azure AD tenant ID from your Microsoft account |
| `EDGE_CLIENT_ID`     | Azure AD application (client) ID               |
| `EDGE_CLIENT_SECRET` | Azure AD client secret value                   |
| `EDGE_PRODUCT_ID`    | Edge product ID from Partner Center            |

### Chrome Web Store (future — add when enabling publish-chrome job)

| Secret                 | Description                                  |
| ---------------------- | -------------------------------------------- |
| `CHROME_EXTENSION_ID`  | Extension ID from Chrome Web Store dashboard |
| `CHROME_CLIENT_ID`     | Google OAuth client ID                       |
| `CHROME_CLIENT_SECRET` | Google OAuth client secret                   |
| `CHROME_REFRESH_TOKEN` | Long-lived OAuth refresh token               |

---

## Microsoft Edge Add-ons API Setup

### Step 1 — Register an Azure AD application

1. Go to [portal.azure.com](https://portal.azure.com) → **Azure Active Directory** → **App registrations** → **New registration**
2. Name: `fb-enhancer-edge-ci` (any name)
3. Supported account types: **Accounts in this organizational directory only**
4. Redirect URI: leave blank
5. Click **Register**

### Step 2 — Create a client secret

1. In your new app registration → **Certificates & secrets** → **New client secret**
2. Description: `GitHub Actions`
3. Expiry: 24 months (set a calendar reminder to rotate)
4. Click **Add** — **copy the secret value immediately** (shown once only)
5. This value → `EDGE_CLIENT_SECRET` secret

### Step 3 — Note your IDs

From the app registration **Overview** page:

- **Application (client) ID** → `EDGE_CLIENT_ID` secret
- **Directory (tenant) ID** → `EDGE_TENANT_ID` secret

### Step 4 — Connect app to Partner Center

1. Go to [partner.microsoft.com](https://partner.microsoft.com) → **Edge extensions** → your extension
2. Go to **Extension overview** → note the **Product ID** → `EDGE_PRODUCT_ID` secret
3. Go to **Extension management** → **Publish API** → add your Azure AD app client ID
   - Input field: **Client ID** → paste `EDGE_CLIENT_ID`
   - Click **Add**

The app now has permission to manage your extension via the API.

---

## GitHub Environments Setup

Environments add an approval gate before publishing to stores.

1. Go to: **Repository → Settings → Environments → New environment**
2. Create environment named exactly: `edge-production`
3. Under **Deployment protection rules** → **Required reviewers** → add yourself
4. Now every release will pause before publishing and wait for your manual approval

Repeat with `chrome-production` when enabling Chrome publishing.

---

## Release Process

### Standard release

```bash
# 1. Ensure main is clean and tested
git checkout main && git pull

# 2. Update version in manifest.json and package.json
#    (CI will also inject version from tag, but keep files in sync)
# manifest.json: "version": "1.2.3"
# package.json:  "version": "1.2.3"
git add manifest.json package.json
git commit -m "chore: bump version to 1.2.3"
git push

# 3. Create and push the tag — this triggers the release workflow
git tag v1.2.3
git push origin v1.2.3
```

The pipeline will:

1. Lint and build the extension
2. Inject `1.2.3` into manifest.json before building
3. Package `fb-enhancer-v1.2.3.zip`
4. Create a GitHub Release with auto-generated changelog
5. Pause at the `edge-production` environment gate (approve in GitHub UI)
6. Upload to Edge Add-ons and submit for review

### Rollback

GitHub Releases are immutable. To roll back:

1. Re-tag a previous commit: `git tag v1.2.4 <previous-sha> && git push origin v1.2.4`
2. The pipeline will build the older code and submit it as a new version

Microsoft does not allow downgrading the version number — always increment.

---

## Chrome Web Store API Setup (when ready)

### Step 1 — Enable the Chrome Web Store API

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → create a project
2. **APIs & Services** → **Enable APIs** → search **Chrome Web Store API** → Enable

### Step 2 — Create OAuth credentials

1. **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID**
2. Application type: **Web application**
3. Authorized redirect URIs: `https://developers.google.com/oauthplayground`
4. Note **Client ID** and **Client Secret** → `CHROME_CLIENT_ID`, `CHROME_CLIENT_SECRET`

### Step 3 — Get a refresh token

1. Go to [developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)
2. Click ⚙️ (settings) → check **Use your own OAuth credentials** → enter your client ID and secret
3. In **Step 1**, enter scope: `https://www.googleapis.com/auth/chromewebstore`
4. **Authorize APIs** → sign in → **Exchange authorization code for tokens**
5. Copy **Refresh token** → `CHROME_REFRESH_TOKEN`

### Step 4 — Get Extension ID

From [chrome.google.com/webstore/developer/dashboard](https://chrome.google.com/webstore/developer/dashboard) → your extension → copy the ID → `CHROME_EXTENSION_ID`

### Step 5 — Enable the job

Uncomment the `publish-chrome` job in `.github/workflows/release.yml`.

---

## Troubleshooting

| Problem                             | Likely cause                                        | Fix                                                    |
| ----------------------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| `Failed to acquire access token`    | Wrong tenant/client ID or secret, or secret expired | Verify secrets in Azure portal, regenerate if expired  |
| `Upload failed — HTTP 401`          | Token expired mid-run                               | Re-run the workflow (token is per-run)                 |
| `Upload failed — HTTP 403`          | App not authorized in Partner Center                | Re-add client ID in Partner Center → Publish API       |
| `Upload failed — HTTP 409`          | A submission is already in progress                 | Cancel the pending submission in Partner Center        |
| `Upload processing Failed`          | Invalid ZIP structure                               | Check `dist/manifest.json` exists; verify build output |
| Lint fails in CI but passes locally | Node version mismatch                               | Ensure local Node matches CI (`node-version: "20"`)    |
| Tag not triggering workflow         | Tag not pushed to origin                            | `git push origin v1.x.x` (push the tag explicitly)     |
