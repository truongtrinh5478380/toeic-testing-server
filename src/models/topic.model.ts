import { Schema, model, Document } from "mongoose"
import { ExerciseDocument } from "./exercise.model";

export type TopicDocument = Document & {
    title: string;
    sections: ExerciseDocument[][]
}

const TopicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sections: [{
        type: [Schema.Types.ObjectId],
        ref: 'Exercises'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Compile model from schema
export const TopicModel = model<TopicDocument>('Topics', TopicSchema);