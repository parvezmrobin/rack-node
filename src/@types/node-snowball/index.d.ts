/// <reference types="node" />

declare module 'node-snowball' {
  export function stemword(words: string[], language: string): string[];
}
