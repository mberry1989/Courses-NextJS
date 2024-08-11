import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
/**
 * Generated by '@kontent-ai/model-generator@7.3.0'
 *
 * Lesson
 * Id: 92e57bd1-983a-466f-8f4d-d721d4279950
 * Codename: lesson
 */
export type Lesson = IContentItem<{
    /**
     * Background Image (asset)
     * Required: false
     * Id: 074dc486-da86-424e-a760-3e39affc3dd3
     * Codename: background_image
     */
    backgroundImage: Elements.AssetsElement;

    /**
     * Content (rich_text)
     * Required: false
     * Id: 447aa7ed-2ce1-4915-be67-38a34b73b9fe
     * Codename: content
     */
    content: Elements.RichTextElement;

    /**
     * Header (text)
     * Required: true
     * Id: 6a3489b5-6703-455d-b93e-16a08810f63a
     * Codename: header
     */
    header: Elements.TextElement;

    /**
     * Sub header (text)
     * Required: false
     * Id: 32cc59ad-f58d-4100-9b2c-273990f486b3
     * Codename: sub_header
     */
    subHeader: Elements.TextElement;
}>;
