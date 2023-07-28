class PostitController < ApplicationController  
  def index
    render json: Postit.order("updated_at DESC")
  end

  def show
    params.permit(:id)
    render json: Postit.order("updated_at DESC")
  end

  def create
    params.require([:postit, :workspace_id])
    postit = Postit.create(postit_params)
    pm = PostitMapping.create(postit_id: postit.id, workspace_id: params[:workspace_id])
    render json: postit
  end

  def update
    postit = Postit.find(params[:id])
    postit.update(postit_params)
    render json: postit
  end

  def destroy
    params.permit(:workspace_id)
    puts params
    postit = Postit.find(params[:id])
    postit.destroy
    render json: postit
  end

  private
    def postit_params
      params.require(:postit).permit(:title, :description, :done, :session_id)
    end
end
