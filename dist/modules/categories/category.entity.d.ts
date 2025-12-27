export declare class Category {
    id: number;
    name: string;
    slug: string | null;
    description: string | null;
    icon: string | null;
    color: string | null;
    isActive: boolean;
    isPro: boolean;
    sortOrder: number;
    parentId: number | null;
    parent: Category | null;
    children: Category[];
    places: any[];
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
