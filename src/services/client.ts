import api from "./config";

class Client {
  _baseUrl: string;

  _headers: { [key: string]: any };

  _data: any;

  _params: { [key: string]: any };

  _remoteMethod?: string;

  _id?: string;

  _progressCallback?: () => void;

  constructor(resource: string) {
    this._baseUrl = resource;
    this._headers = {};
    this._data = {};
    this._params = {};
    this._remoteMethod = undefined;
    this._id = undefined;
    this._progressCallback = undefined;
  }

  get baseUrl() {
    let url = this._baseUrl;

    if (this._id) {
      url += `/${this._id}`;
    }

    if (this._remoteMethod) {
      url += `/${this._remoteMethod}`;
    }

    return url;
  }

  get formatParams() {
    return {
      params: this._params,
      headers: this._headers,
      onUploadProgress: this._progressCallback,
    };
  }

  id(id: string) {
    this._id = `${id}/`;
    return this;
  }

  progressCallback(callback: () => void) {
    this._progressCallback = callback;
    return this;
  }

  remoteMethod(url: string) {
    this._remoteMethod = url;
    return this;
  }

  formData() {
    return this.header("Content-Type", "multipart/form-data");
  }

  header(key: string, value: any) {
    this._headers[key] = value;
    return this;
  }

  headers(headers: object) {
    Object.assign(this._headers, headers);
    return this;
  }

  param(key: string, value: any) {
    this._params[key] = value;
    return this;
  }

  params(params: object) {
    Object.assign(this._params, params);
    return this;
  }

  data(data: any) {
    this._data = data;
    return this;
  }

  filter(obj: object) {
    return this.param("filter", obj);
  }

  where(obj: object) {
    const filter = this._params.filter || {};
    return this.filter({ ...filter, where: obj });
  }

  get() {
    return api.get(this.baseUrl, this.formatParams);
  }

  post() {
    return api.post(this.baseUrl, this._data, this.formatParams);
  }

  put() {
    return api.put(this.baseUrl, this._data, this.formatParams);
  }

  patch() {
    return api.patch(this.baseUrl, this._data, this.formatParams);
  }

  delete() {
    return api.delete(this.baseUrl, { data: this._data, ...this.formatParams });
  }
}

export default function (resourceName: string) {
  return new Client(resourceName);
}
