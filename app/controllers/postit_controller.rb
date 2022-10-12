class PostitController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    render json: Postit.order("updated_at DESC")
  end

  def create
    postit = Postit.create(postit_params)
    render json: postit
  end

  def update
    postit = Postit.find(params[:id])
    postit.update(postit_params)
    render json: postit
  end

  def destroy
    postit = Postit.find(params[:id])
    postit.destroy
    render json:
  end

  private
    def postit_params
      params.require(:postit).permit(:title, :description, :done)
    end
end
