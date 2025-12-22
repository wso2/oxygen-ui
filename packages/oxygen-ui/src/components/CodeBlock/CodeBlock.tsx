/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';

export interface CodeBlockProps {
  /**
   * The code to display
   */
  code: string;
  /**
   * The programming language for syntax highlighting
   * @default 'tsx'
   */
  language?: 'javascript' | 'typescript' | 'jsx' | 'tsx' | 'css' | 'bash' | 'json' | 'markup' | 'html';
  /**
   * Show line numbers
   * @default false
   */
  showLineNumbers?: boolean;
}

/**
 * CodeBlock component with syntax highlighting powered by Prism.js
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'tsx',
  showLineNumbers = false 
}) => {
  const theme = useTheme();
  
  // Check color scheme from DOM attribute (set by MUI's extendTheme)
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkColorScheme = () => {
      const htmlElement = document.documentElement;
      const colorScheme = htmlElement.getAttribute('data-color-scheme');
      setIsDark(colorScheme === 'dark' || theme.palette.mode === 'dark');
    };

    checkColorScheme();
    
    // Watch for changes to the color scheme attribute
    const observer = new MutationObserver(checkColorScheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-scheme'],
    });

    return () => observer.disconnect();
  }, [theme.palette.mode]);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  // Get syntax colors from theme with fallback
  const defaultColors = {
    background: isDark ? '#1e1e1e' : '#f5f5f5',
    text: isDark ? '#d4d4d4' : '#24292e',
    comment: isDark ? '#6a9955' : '#6a737d',
    keyword: isDark ? '#569cd6' : '#d73a49',
    string: isDark ? '#ce9178' : '#032f62',
    function: isDark ? '#dcdcaa' : '#6f42c1',
    number: isDark ? '#b5cea8' : '#005cc5',
    operator: isDark ? '#d4d4d4' : '#d73a49',
  };
  
  const colors = (isDark ? theme.vars?.syntax?.dark : theme.vars?.syntax?.light) || defaultColors;

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        overflow: 'hidden',
        border: `1px solid ${theme.vars?.palette.divider || theme.palette.divider}`,
        mb: 2,
        '& pre': {
          margin: 0,
          padding: 2,
          overflow: 'auto',
          backgroundColor: colors.background,
          color: colors.text,
          fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
          fontSize: '0.875rem',
          lineHeight: 1.6,
        },
        '& code': {
          fontFamily: 'inherit',
          fontSize: 'inherit',
          color: colors.text,
        },
        // Prism.js syntax highlighting colors
        '& .token.comment, & .token.prolog, & .token.doctype, & .token.cdata': {
          color: colors.comment,
        },
        '& .token.punctuation': {
          color: colors.text,
        },
        '& .token.property, & .token.tag, & .token.boolean, & .token.constant, & .token.symbol, & .token.deleted': {
          color: colors.keyword,
        },
        '& .token.selector, & .token.attr-name, & .token.string, & .token.char, & .token.builtin, & .token.inserted': {
          color: colors.string,
        },
        '& .token.operator, & .token.entity, & .token.url': {
          color: colors.operator,
        },
        '& .token.atrule, & .token.attr-value, & .token.keyword': {
          color: colors.keyword,
        },
        '& .token.function, & .token.class-name': {
          color: colors.function,
        },
        '& .token.regex, & .token.important, & .token.variable': {
          color: colors.keyword,
        },
        '& .token.number': {
          color: colors.number,
        },
        ...(showLineNumbers && {
          '& .line-numbers-rows': {
            borderRight: `1px solid ${theme.vars?.palette.divider || theme.palette.divider}`,
          },
        }),
      }}
    >
      <Box
        component="pre"
        className={showLineNumbers ? 'line-numbers' : ''}
      >
        <code className={`language-${language}`}>
          {code}
        </code>
      </Box>
    </Box>
  );
};

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
