class WorkspaceController < ApplicationController  
  def show
    workspace = Workspace.includes(:postit_mappings).where(id: params[:id])
    postits = []
    status = :no_content
    if Workspace.includes(:postit_mappings).where(id: params[:id]).any?
      workspace = Workspace.find_by_id(params[:id])
      mappings = workspace.postit_mappings.includes(:postit)
      mappings.map { | mapping | postits.append(mapping.postit) }
      status = :ok
    end
    render json: postits, :status => status
  end

  def create
    workspace = Workspace.create()
    render json: workspace
  end
end
