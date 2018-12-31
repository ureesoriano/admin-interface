/**
 * @module src/Utils/Mount/Mount
 * @flow
 */
import { Registry } from 'admin-interface-mn-core';

/**
 * Get mount path
 * @returns {string}
 */
export function getMountPath(): string {
    return Registry.getRepository('App').get('instance').mountpath;
}
