class Alert {
  private alert: string;

  constructor() {
    this.alert = "";
  }

  get() {
    return this.alert;
  }

  set(new_alert: string){
    this.alert = new_alert;
  }

  clear(){
    this.alert = "";
  }
}

// Export a single instance of TokenManager
export default new Alert();
