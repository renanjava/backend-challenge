export class DocumentEntity {
  constructor(
    public title: string,
    public content: string,
    public sourceType: string,
    public clientId: string,
  ) {}
}
