class MessagesController < ApplicationController
  def create
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message = Message.new(message_params)
    @message.chatroom = @chatroom
    @message.user = current_user

    @message.save
    ChatroomChannel.broadcast_to(
      @chatroom,
      render_to_string(partial: "messages/message", locals: { message: @message })
      # for everyone listening to this specific channel @channel, ping the new partial with @message just created
    )
    head :ok # dont send a view and redirect
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
