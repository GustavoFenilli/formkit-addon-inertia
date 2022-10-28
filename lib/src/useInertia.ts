import { Inertia, Visit, Progress, Page, Errors, VisitOptions, PendingVisit, ActiveVisit, RequestPayload, Method } from '@inertiajs/inertia'
import { createMessage, FormKitNode } from '@formkit/core';

export interface FormKitAddonInertiaDisableOptions {
  disableLoading: boolean;
  disableDisabled: boolean;
  disableProgress: boolean;
  disableErrors: boolean;
};

export declare type FormKitAddonInertiaOptions = Partial<Visit & {
  onCancelToken: (cancelToken: VoidFunction, node: FormKitNode) => void;
  onBefore: (visit: PendingVisit, node: FormKitNode) => void;
  onStart: (visit: PendingVisit, node: FormKitNode) => void;
  onProgress: (progress: Progress | undefined, node: FormKitNode) => void;
  onFinish: (visit: ActiveVisit, node: FormKitNode) => void;
  onCancel: (node: FormKitNode) => void;
  onSuccess: (page: Page, node: FormKitNode) => void;
  onError: (errors: Errors, node: FormKitNode) => void;
} & FormKitAddonInertiaDisableOptions>;

export interface FormKitAddonInertiaVisits {
  visit: (url: URL, options?: FormKitAddonInertiaOptions) => void;
  get: (url: URL | string, data?: RequestPayload, options?: Exclude<FormKitAddonInertiaOptions, 'method' | 'data'>) => void;
  post: (url: URL | string, data?: RequestPayload, options?: Exclude<FormKitAddonInertiaOptions, 'method' | 'data'>) => void;
  put: (url: URL | string, data?: RequestPayload, options?: Exclude<FormKitAddonInertiaOptions, 'method' | 'data'>) => void;
  patch: (url: URL | string, data?: RequestPayload, options?: Exclude<FormKitAddonInertiaOptions, 'method' | 'data'>) => void;
  delete: (url: URL | string, options?: Exclude<FormKitAddonInertiaOptions, 'method'>) => void;
  reload: (options?: Exclude<FormKitAddonInertiaOptions, 'preserveScroll' | 'preserveState'>) => void;
};

const loadingMessage = createMessage({
  key: 'loading',
  visible: false,
  value: true,
});

const injectNode = (
  node: FormKitNode,
  options?: FormKitAddonInertiaOptions
): VisitOptions => {
  const addonOptions: VisitOptions = {};

  addonOptions.onCancelToken = ({ cancel }) => {
    if (options?.onCancelToken) options.onCancelToken(cancel, node);
  };

  addonOptions.onBefore = (visit) => {
    if (options?.onBefore) options.onBefore(visit, node);
  };

  addonOptions.onStart = (visit) => {
    if (!options?.disableLoading) node.store.set(loadingMessage);
    if (!options?.disableDisabled) node.props.disabled = true;

    if (options?.onStart) options.onStart(visit, node);
  };

  addonOptions.onProgress = (progress) => {
    if (!options?.disableProgress && node.context) node.context.attrs = { 'data-progress': progress?.total };

    if (options?.onProgress) options.onProgress(progress, node);
  };

  addonOptions.onFinish = (visit) => {
    if (!options?.disableLoading) node.store.remove('loading');
    if (!options?.disableDisabled) node.props.disabled = false;
    if (!options?.disableProgress && node.context && node.context.attrs['data-progress']) delete node.context.attrs['data-progress'];

    if (options?.onFinish) options.onFinish(visit, node);
  };

  addonOptions.onCancel = () => {
    if (options?.onCancel) options.onCancel(node);
  };

  addonOptions.onSuccess = (page) => {
    if (options?.onSuccess) options.onSuccess(page, node);
  };

  addonOptions.onError = (errors) => {
    if (!options?.disableErrors) node.setErrors([], errors);

    if (options?.onError) options.onError(errors, node);
  };

  return addonOptions;
};

export const useInertia = (formNode: FormKitNode) => {
  return {
    visit: (url: URL, options?: FormKitAddonInertiaOptions) => Inertia.visit(url, injectNode(formNode, options)),
    get: (url: URL | string, data?: RequestPayload, options?: Exclude<FormKitAddonInertiaOptions, 'method' | 'data'>) => Inertia.visit(url, { method: Method.GET, data, ...injectNode(formNode, options) }),
    post: (url: URL | string, data?: RequestPayload, options?: Exclude<FormKitAddonInertiaOptions, 'method' | 'data'>) => Inertia.visit(url, { method: Method.POST, data, ...injectNode(formNode, options) }),
    put: (url: URL | string, data?: RequestPayload, options?: Exclude<FormKitAddonInertiaOptions, 'method' | 'data'>) => Inertia.visit(url, { method: Method.PUT, data, ...injectNode(formNode, options) }),
    patch: (url: URL | string, data?: RequestPayload, options?: Exclude<FormKitAddonInertiaOptions, 'method' | 'data'>) => Inertia.visit(url, { method: Method.PATCH, data, ...injectNode(formNode, options) }),
    delete: (url: URL | string, options?: Exclude<FormKitAddonInertiaOptions, 'method'>) => Inertia.visit(url, { method: Method.DELETE, ...injectNode(formNode, options) }),
    reload: (options?: Exclude<FormKitAddonInertiaOptions, 'preserveScroll' | 'preserveState'>) => Inertia.reload(injectNode(formNode, options)),
  };
};
