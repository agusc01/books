export interface IToast {
    title?: string;
    text: string;
    type: 'error' | 'success' | 'warning' | 'info';
    timer?: number;
}