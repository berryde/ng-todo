interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export class Todo implements ITodo {
  public id!: string;
  public text!: string;
  public completed!: boolean;

  constructor(props: ITodo) {
    Object.assign(this, props);
  }
}
