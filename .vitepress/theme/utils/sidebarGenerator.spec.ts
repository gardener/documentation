import { beforeEach, describe, expect, it } from 'vitest';
import {personaSidebar} from './sidebarGenerator.js';
import {writeFileSync} from "node:fs";


describe('Sidebar Generator', () => {
  it('should ', () => {
    personaSidebar('Users')

  });
});
