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

import {Box, Link, Typography} from '@wso2/oxygen-ui';
import type {ReactNode} from 'react';

/**
 * Renders the small subset of Markdown that rule docs use: `##` headings, paragraphs, `-` lists,
 * inline code, bold text and links. The text is rendered as React elements, never as raw HTML.
 */
export default function Markdown({source}: {source: string}) {
  const blocks = source.trim().split(/\n{2,}/);

  return (
    <Box>
      {blocks.map((block, index) => {
        const lines = block.split('\n');

        if (lines[0].startsWith('## ')) {
          return (
            <Typography key={index} variant="h6" component="h3" sx={{mt: index === 0 ? 0 : 3, mb: 1}}>
              {renderInline(lines[0].slice(3))}
            </Typography>
          );
        }

        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <Box key={index} component="ul" sx={{pl: 3, my: 1}}>
              {lines.map((line, item) => (
                <Typography key={item} component="li" variant="body2" sx={{mb: 0.5}}>
                  {renderInline(line.slice(2))}
                </Typography>
              ))}
            </Box>
          );
        }

        return (
          <Typography key={index} variant="body2" sx={{my: 1}}>
            {renderInline(lines.join(' '))}
          </Typography>
        );
      })}
    </Box>
  );
}

/** Renders inline code, bold text and links in one line of text. */
export function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }

    const key = parts.length;
    if (match[1] !== undefined) {
      parts.push(
        <Box key={key} component="code" sx={{fontFamily: 'monospace', fontSize: '0.875em', px: 0.5, borderRadius: 0.5, bgcolor: 'action.hover'}}>
          {match[1]}
        </Box>,
      );
    } else if (match[2] !== undefined) {
      parts.push(<strong key={key}>{match[2]}</strong>);
    } else if (/^https?:\/\//.test(match[4])) {
      parts.push(
        <Link key={key} href={match[4]} target="_blank" rel="noopener noreferrer">
          {match[3]}
        </Link>,
      );
    } else {
      // Relative links point into the Oxygen UI repository and cannot be followed from a report.
      parts.push(match[3]);
    }

    last = pattern.lastIndex;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts;
}
