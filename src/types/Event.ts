export interface Event {
    _id: string;
    title: string;
    description: string;
    location: string;
    date: string; // ISO date string
    createdBy: {
        id: string;
        name: string;
        role: 'ngo' | 'volunteer';
    };
    tags: string[];
    status: 'active' | 'completed' | 'cancelled';
    participants: {
        id: string;
        name: string;
    }[];
    createdAt: string; // ISO date string
    tasks: {
        title: string;
        description?: string;
        status: 'pending' | 'in progress' | 'completed';
        assignedTo?: string;
    }[];
    chat: any[]; // Assuming it's an array, you can type it properly if needed
    __v: number;
}
