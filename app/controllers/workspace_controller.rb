class WorkspaceController < ApplicationController
  protect_from_forgery with: :null_session
  
  def show
    workspace = Workspace.includes(:postit_mappings).where(id: params[:id])
    status = :no_content
    if Workspace.includes(:postit_mappings).where(id: params[:id]).any?
      workspace = Workspace.find_by_id(params[:id])
      status = :ok
    end
    render json: workspace.to_json(:include => :postits), :status => status
  end

  def create
    workspace = Workspace.create()
    render json: workspace
  end
end
