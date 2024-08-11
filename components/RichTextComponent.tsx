import { Elements } from '@kontent-ai/delivery-sdk';
import {
  PortableTextComponent,
  PortableTextImage,
  PortableTextItem,
} from '@kontent-ai/rich-text-resolver';
import { nodeParse } from '@kontent-ai/rich-text-resolver';
import { transformToPortableText } from '@kontent-ai/rich-text-resolver';
import {
  PortableText,
  PortableTextReactComponents,
  PortableTextTypeComponentProps,
} from '@portabletext/react';
import Image from 'next/image';
import { FC } from 'react';
import { sanitizeFirstChildText } from '../lib/anchors';
import { Fact, Lesson } from '../models';
import LessonComponent from './LessonComponent';
import FactComponent from './FactComponent';

type ElementProps = Readonly<{
  element: Elements.RichTextElement;
  isInsideTable: boolean;
  language: string;
  courseId?: string | null;
}>;

export const createDefaultResolvers = (
  element: Elements.RichTextElement,
  isElementInsideTable: boolean = false,
  language = 'default',
  courseId = null
): Partial<PortableTextReactComponents> => ({
  types: {
    image: ({ value }: PortableTextTypeComponentProps<PortableTextImage>) => {
      const asset = element.images.find((i) => i.imageId === value.asset._ref);
      if (!asset) {
        return null;
      }

      if (isElementInsideTable) {
        return (
          <div className='w-28 h-14 relative not-prose'>
            <Image
              src={value.asset.url}
              alt={asset.description ?? ''}
              fill
              className='object-contain'
            />
          </div>
        );
      }

      return (
        <span className='flex justify-center'>
          <Image
            src={value.asset.url}
            alt={asset.description ?? ''}
            width={asset.width ?? undefined}
            height={asset.height ?? undefined}
          />
        </span>
      );
    },
    // table: ({ value }: PortableTextTypeComponentProps<PortableTextTable>) => {
    //   return (
    //     <table className='table-auto'>
    //       <tbody>
    //         {value.rows.map((r) => (
    //           <tr key={r._key}>
    //             {r.cells.map((c) => (
    //               <td key={c._key}>
    //                 <RichTextValue
    //                   isInsideTable
    //                   language={language}
    //                   value={c.content}
    //                   element={element}
    //                 />
    //               </td>
    //             ))}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   );
    // },
    component: ({
      value,
    }: PortableTextTypeComponentProps<PortableTextComponent>) => {
      const componentItem = element.linkedItems.find(
        (i) => i.system.codename === value.component._ref
      );

      if (!componentItem) {
        return null;
      }

      switch (componentItem.system.type) {
        case 'lesson':
          const lesson = componentItem as Lesson
          return (
            <LessonComponent
              header={lesson.elements.header.value} 
              subHeader={lesson.elements.subHeader.value}
              backgroundImage={lesson.elements.backgroundImage.value[0].url}
              content={lesson.elements.content}
              courseId={courseId}
              lessonId={lesson.system.id}
            />
          );
          case 'fact':
          const fact = componentItem as Fact
          return (
              <FactComponent
                title={fact.elements.title.value} 
                body={fact.elements.body.value}
                Image=''
              />
          );
        default:
          return (
            <div>
              Unsupported content type &quot;{componentItem.system.type}&quot;
            </div>
          );
      }
    },
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({children}) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,

    // Ex. 2: rendering custom list items
    checkmarks: ({children}) => <li>{children}</li>,
  },
  marks: {
    sub: (props) => <sub>{props.children}</sub>,
    sup: (props) => <sup>{props.children}</sup>,
    // internalLink: ({
    //   value,
    //   children,
    // }: PortableTextMarkComponentProps<PortableTextInternalLink>) => {
    //   const link = element.links.find(
    //     (l) => l.linkId === value?.reference._ref
    //   );
    //   if (!link) {
    //     return <>{children}</>;
    //   }

    //   return (
    //       {children}
    //   );
    // },
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={value?.rel}
          title={value?.title}
        >
          {children}
          {!!value['data-new-window'] && (
            <div className='w-5 inline-block ml-1' />
          )}
        </a>
      );
    },
  },
  block: {
    // TODO don't resolve when block contains link type markdef
    h1: ({ value, children }) => (
      <h1 className='scroll-mt-20 heading' id={sanitizeFirstChildText(value)}>
        <a href={`#${sanitizeFirstChildText(value)}`}>{children}</a>
      </h1>
    ),
    h2: ({ value, children }) => (
      <h2 className='scroll-mt-20 heading' id={sanitizeFirstChildText(value)}>
        <a href={`#${sanitizeFirstChildText(value)}`}>{children}</a>
      </h2>
    ),
    h3: ({ value, children }) => (
      <h3 className='scroll-mt-20 heading' id={sanitizeFirstChildText(value)}>
        <a href={`#${sanitizeFirstChildText(value)}`}>{children}</a>
      </h3>
    ),
    h4: ({ value, children }) => (
      <h4 className='scroll-mt-20 heading' id={sanitizeFirstChildText(value)}>
        <a href={`#${sanitizeFirstChildText(value)}`}>{children}</a>
      </h4>
    ),
    h5: ({ value, children }) => (
      <h5 className='scroll-mt-20 heading' id={sanitizeFirstChildText(value)}>
        <a href={`#${sanitizeFirstChildText(value)}`}>{children}</a>
      </h5>
    ),
    h6: ({ value, children }) => (
      <h6 className='scroll-mt-20 heading' id={sanitizeFirstChildText(value)}>
        <a href={`#${sanitizeFirstChildText(value)}`}>{children}</a>
      </h6>
    ),
  },
});

export const RichTextElement: FC<ElementProps> = (props) => {
  const portableText = transformToPortableText(nodeParse(props.element.value));

  return (
    <PortableText
      value={portableText}
      components={createDefaultResolvers(props.element, false, 'courses')}
    />
  );
};

type RichTextValueProps = Readonly<{
  element: Elements.RichTextElement;
  language: string;
  value: PortableTextItem[];
  isInsideTable: boolean;
}>;

const RichTextValue: FC<RichTextValueProps> = (props) => (
  <PortableText
    value={props.value}
    components={createDefaultResolvers(
      props.element,
      props.isInsideTable,
      props.language
    )}
  />
);