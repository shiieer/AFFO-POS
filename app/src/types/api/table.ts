export type TableApi = {
	id: number;
	name: string;
	qr_token: string;
	is_active: boolean;
	created_at: string;
	qr_url: string | null;
	qr_image_url: string | null;
};

export type CreateTablePayload = {
	name: string;
};
