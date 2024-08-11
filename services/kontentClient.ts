import { camelCasePropertyNameResolver, createDeliveryClient, IContentItem, IContentItemElements } from "@kontent-ai/delivery-sdk";

const deliveryClient = createDeliveryClient({
    environmentId: process.env.KONTENT_ENVIRONMENT_ID ?? '',
    previewApiKey: process.env.KONTENT_PREVIEW_KEY ?? '',
    defaultQueryConfig: {
        usePreviewMode: process.env.KONTENT_PREVIEW_KEY !== '' ? true : false
    },
    propertyNameResolver: camelCasePropertyNameResolver
});

export async function getItemByCodename<T extends IContentItem<IContentItemElements>>(codename: string, depth: number) {
    const response = await deliveryClient.item<T>(codename)
        .depthParameter(depth)
        .toPromise()

    return response.data.item
}

export async function getItemByUrlSlug<T extends IContentItem<IContentItemElements>>(
    element: string,
    slug: string,
    depth: number) {
    const response = await deliveryClient.items<T>()
        .equalsFilter(`elements.${element}`, slug)
        .depthParameter(depth)
        .toPromise()

    return response.data.items[0]
}

export async function getItems<T extends IContentItem<IContentItemElements>>(depth: number) {
    const response = await deliveryClient.items<T>()
        .depthParameter(depth)
        .toPromise()

    return response.data.items
}

export async function getItemsOfType<T extends IContentItem<IContentItemElements>>(type: string, depth: number, limit?: number) {
    if(limit){
    const response = await deliveryClient.items<T>()
        .type(type)
        .depthParameter(depth)
        .limitParameter(limit)
        .toPromise()

        return response.data.items
    }
    const response = await deliveryClient.items<T>()
        .type(type)
        .depthParameter(depth)
        .toPromise()

    return response.data.items
}

export async function getWSLNavigationItems<T extends IContentItem<IContentItemElements>>(
    homepageCodename: string,
    subpagesCodename: string,
    titleCodename: string,
    urlCodename: string,
    depth: number) {
    const response = await deliveryClient.item<T>(homepageCodename)
        .depthParameter(depth)
        .elementsParameter([subpagesCodename, titleCodename, urlCodename])
        .toPromise()

    return response.data.item
}

export async function getTaxonomy(codename: string){
    const response = await deliveryClient.taxonomy(codename).toPromise()

    return response.data.taxonomy
}

export async function getElementsOfItem(elementsCodename:string[], itemCodename:string){
    const response = await deliveryClient.item(itemCodename)
        .elementsParameter(elementsCodename)
        .toPromise()

    return response.data.item.elements
}

export async function getElementsOfItemFromSlug(elementsCodename:string[], itemSlug:string){
    const response = await deliveryClient.items()
        .equalsFilter('elements.url', itemSlug)
        .elementsParameter(elementsCodename)
        .toPromise()

    return response.data.items[0].elements
}

export async function getItemsContainingTerms<T extends IContentItem<IContentItemElements>>(elementCodename:string, terms:string[]){
    const response = await deliveryClient.items<T>()
    .containsFilter(elementCodename, terms)
    .toPromise()

    return response.data.items
}