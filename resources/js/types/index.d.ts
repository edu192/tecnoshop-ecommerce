export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    lastname: string | null;
    type: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
export type PaginatedModelData<T> = {
    paginated_data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    meta: {
        current_page: number;
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    }
}