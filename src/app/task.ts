interface ITask {
  id?: string;
  text: string;
  completed: boolean;
}

export class Task implements ITask {
  public id?: string;
  public text!: string;
  public completed!: boolean;

  constructor(props: ITask) {
    Object.assign(this, props);
  }
}
