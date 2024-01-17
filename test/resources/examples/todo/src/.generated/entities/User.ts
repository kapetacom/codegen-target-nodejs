//
// GENERATED SOURCE - DO NOT EDIT
//

import { Idable } from 'generated:entities/Idable';
import { State } from 'generated:entities/State';
/**
 * User - from Users block
 */
export interface User extends Idable {
    name?: string;
    email: string;
    state: State;
}
