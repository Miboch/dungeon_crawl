import {Renderer} from '@game/src/system';

export class Shader {
  _gl: WebGLRenderingContext;
  private _program: WebGLProgram;


  constructor(private name: string, private vertexSource: string, fragmentSource: string) {
    this._gl = Renderer.getInstance().getContext();
    const v = this.loadShader(vertexSource, this._gl.VERTEX_SHADER);
    const f = this.loadShader(fragmentSource, this._gl.FRAGMENT_SHADER);
    this._program = this.createProgram(v, f);
  }

  public get shaderName() {
    return this.name;
  }

  private loadShader(source: string, type: number): WebGLShader {
    let shader: WebGLShader = this._gl.createShader(type) as WebGLShader;
    this._gl.shaderSource(shader, source);
    this._gl.compileShader(shader);
    let err = this._gl.getShaderInfoLog(shader);
    if (Boolean(err)) throw new Error(`Unable to compile shader ${this.name} - ${err}`)
    return shader;
  }

  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    let program = this._gl.createProgram() as WebGLProgram;
    this._gl.attachShader(program, vertexShader)
    this._gl.attachShader(program, fragmentShader);
    return program;
  }


}
