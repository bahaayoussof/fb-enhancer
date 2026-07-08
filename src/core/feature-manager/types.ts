import type { FeatureId } from '@shared/types';
import type { PageContext } from '@core/context/types';

export interface IFeature {
  readonly id: FeatureId;
  readonly displayName: string;
  readonly description: string;
  readonly defaultEnabled: boolean;
  run(context: PageContext, nodes: Node[]): void;
  teardown(): void;
}
