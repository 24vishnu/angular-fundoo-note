import { Label } from './label';

// tslint:disable:variable-name
export class NoteForm {
    title: string;
    content: string;
    image: null;
    change_color: string;
    is_archive: boolean;
    is_trashed: boolean;
    label: Array<Label>;
    collaborate: Array<string>;
    reminder: Date;
}
