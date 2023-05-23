import { Schema, model, Document } from "mongoose"

export type QuestionDocument = Document & {
	question: string;
	correctAnswer: string;
	answers: {
		cate: string;
		name: string;
	}[];
}

const QuestionSchema = new Schema({
	question: {
		type: String,
	},
	correctAnswer: {
		type: String,
		required: true
	},
	answers: [{
		cate: { type: String, required: true },
		name: { type: String, required: true }
	}]
});

// Compile model from schema
export const QuestionModel = model<QuestionDocument>('Questions', QuestionSchema);