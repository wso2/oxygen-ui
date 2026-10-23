/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export {analyze, type AnalyzeOptions} from './engine/analyze.js';
export {DEFAULT_IGNORE, DEFAULT_INCLUDE} from './engine/defaults.js';
export * from './report/types.js';
export {formatJson} from './reporters/json.js';
export {formatTerminal, type TerminalFormatOptions} from './reporters/terminal.js';
export {
  applyFixes,
  planFixes,
  type ApplyOptions,
  type FileFix,
  type FixOptions,
  type FixPlan,
  type FixResult,
  type VerificationResult,
} from './fix/fix.js';
export {formatUnifiedDiff} from './fix/diff.js';
export {formatFixJson, formatFixPlan, formatFixResult, type FixFormatOptions} from './reporters/fix.js';
export {loadUiAssets, renderReportHtml, serializeForScript, type RenderReportOptions, type UiAssets} from './ui/html.js';
export {startDevServer, type DevServer, type DevServerOptions} from './ui/server.js';
export {createBaseline, pruneBaseline, readBaseline, writeBaseline, type Baseline, type BaselineEntry} from './baseline/baseline.js';
export {CONFIG_TEMPLATE, initConfig} from './config/init.js';
export {CONFIG_FILES, ConfigError, DEFAULT_BASELINE, loadConfig, resolveConfig} from './config/load.js';
export type {AnalyzerConfig, ExceptionConfig, ResolvedConfig, RuleSetting, RuleSettingSeverity} from './config/types.js';
export {evaluateCheck, formatCheck, formatCheckJson, type CheckFormatOptions, type CheckResult} from './reporters/check.js';
export {createAiFixPlan, DEFAULT_AI_PLAN, writeAiFixPlan, type AiFixPlan, type AiFixTask, type AiPlanOptions} from './fix/ai-plan.js';
export {getFindingIds} from './engine/analyze.js';
