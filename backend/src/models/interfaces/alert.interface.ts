export interface IAlert {
    title?: string;
    text: string;
    type: 'error' | 'success' | 'warning' | 'info' | 'question';
    timer?: number;
}