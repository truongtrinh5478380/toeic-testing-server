import { Schema, model, Document } from "mongoose"

export type ResultDocument = Document & {
	question: string;
}

const ResultSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users'
	},
	topic: {
		type: Schema.Types.ObjectId,
		ref: 'Topics'
	},
	point: {
		type: Number,
		default: 0
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

// Compile model from schema
export const ResultModel = model<ResultDocument>('Results', ResultSchema);