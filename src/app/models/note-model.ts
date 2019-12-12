import { Label } from './label';

// tslint:disable
export class NoteModel {
    id: number;
    title: string;
    content: any;
    change_color: any;
    is_archive: boolean;
    is_trashed: boolean;
    label: Label;
    collaborate: any;
    reminder: Date;
}
