import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static targets = ["messages"]
  connect() {
    console.log("HEllO from Stim-Sub");
    console.log(this.messagesTarget);
  }
}
