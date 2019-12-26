import { Label } from './label';

// tslint:disable:variable-name
export class Note {
    user_id: number;
    id: number;
    title: string;
    content: string;
    change_color: string;
    is_archive: boolean;
    is_trashed: boolean;
    label: Label[] = [];
    collaborate: string[] = [];
    image: null;
    reminder: Date;
    is_check: boolean;
    is_pin: boolean;
    time_stamp: Date;
}
