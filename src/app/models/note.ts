import { Label } from './label';

// tslint:disable:variable-name
export class Note {
    user_id: number;
    id: number;
    title: string;
    content: string;
    image: null;
    change_color: string;
    is_archive: boolean;
    is_trashed: boolean;
    collaborate: Array<string>;
    reminder: Date;
    label: Array<Label>;
    is_check: boolean;
    is_pin: boolean;
    time_stamp: Date;
}
