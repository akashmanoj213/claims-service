import { Firestore, Timestamp } from "@google-cloud/firestore";
import { Injectable } from "@nestjs/common";

@Injectable() 
export class FirestoreService {
    readonly PROJECT_ID = "pruinhlth-nprd-dev-scxlyx-7250";
    private db;

    constructor() {
        this.db = new Firestore({
            projectId: this.PROJECT_ID,
            ignoreUndefinedProperties: true
          });
    }

    async createOrOverride<T>(collectionName: string, id: number, entity: T) {
        const res = await this.db.collection(collectionName).doc(id.toString()).set(entity);
        return res;
    }

    async create<T>(collectionName: string, entity: T) {
        const docRef = this.db.collection(collectionName).doc();

        entity = {
            id: docRef.id,
            ...entity,
            createdAt: Timestamp.now()
        }

        const res = await docRef.set(entity);
        console.log("document Saved", res);
        return entity;
    }

    async update<T>(collectionName: string, id: string, entity: T) {
        const docRef = this.db.collection(collectionName).doc(id);
        entity = {
            ...entity,
            updatedAt: Timestamp.now()
        }
        const res = await docRef.update(entity);
        return res;
    }

    async findById(collectionName: string, id: string) {
        const collectionRef = this.db.collection(collectionName).doc(id);
        const doc = await collectionRef.get();
        const data = doc.data();
        const exists = doc.exists;

        return {
            exists,
            data
        }
    }

    async findAll(collectionName: string) {
        const collectionRef = this.db.collection(collectionName);
        const snapshot = await collectionRef.get();

        const entities = [];
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            entities.push(doc.data());
          });

        return entities;
    }
}