class Department {
  public id?: number;
  public departmentName?: string;
  public departmentDescription?: string;

  constructor({ id, departmentName, departmentDescription }: Department) {
    this.id = id;
    this.departmentName = departmentName;
    this.departmentDescription = departmentDescription;
  }
}

export default Department;
