import {Renderer} from '@game/src/system';


export class Shader {
  _gl: WebGLRenderingContext;

  constructor(private vertexSource: string, fragmentSource: string) {
    this._gl = Renderer.getInstance().getContext();
    const vertShader = this.loadShader(vertexSource, this._gl.VERTEX_SHADER);
    const fragShader = this.loadShader(fragmentSource, this._gl.FRAGMENT_SHADER);
  }


  private loadShader(source: string, type: number): WebGLShader {
    let shader: WebGLShader = this._gl.createShader(type) as WebGLShader;
    this._gl.shaderSource(shader, source);
    this._gl.compileShader(shader);
    this._gl.getShaderInfoLog(shader);
    return shader;
  }


}
