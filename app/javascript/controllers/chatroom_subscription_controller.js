import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable";

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static targets = ["messages"]
  static values = {
    chatroomId: Number
  }
  connect() {
    console.log("HEllO from Stim-Sub");
    console.log(`Connecting to ActionCable channel id#${this.chatroomIdValue}`);
    // console.log(this.chatroomIdValue);
    // console.log(this.messagesTarget);
    this.channel = createConsumer().subscriptions.create(
      {
        channel: "ChatroomChannel",
        id: this.chatroomIdValue //pass id coming from HTML to the chatroom channel to know to which channel stream to
      }, //creates consumer instance to start subscription, connection between web browser and radio tower ("Chatroom channel")
      {
        received: (data) => {
          this.#insertMessageAndScrollDown(data);
        }
      }
    )
  }

  disconnect(){
    console.log("Disconnecting");
    this.channel.unsubscribe() //stop Actioncable sub
  }

  resetForm(event) {
    console.log(event);
    const form = event.target
    form.reset()
  }

  #insertMessageAndScrollDown(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }

}
