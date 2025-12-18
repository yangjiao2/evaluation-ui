
import CardMessage from '@/components/Plugins/Typewriter/Card';


export const getReactMarkDownCustomComponents = () => {

    return {
        code({ node, inline, className, children, ...props }) {
        if (children.length) {
            if (children[0] == '▍') {
            return <span className="animate-pulse cursor-default mt-1">▍</span>
            }

            children[0] = (children[0] as string).replace("`▍`", "▍")
        }

        const match = /language-(\w+)/.exec(className || '');

        return (
            <code className={className} {...props}>
            {children}
            </code>
        );
        },
        card: (cardInfo) => {
          let payload = null
          try {
            payload = JSON.parse(cardInfo.children[0])
          }
          catch (error) {
            console.log(error)
          }
          return (
              <>
                {payload && <CardMessage payload={payload}/>}
              </>
          );
        },
        table({ children }) {
        return (
            <table className="border-collapse border border-black px-3 py-1 dark:border-white">
            {children}
            </table>
        );
        },
        th({ children }) {
        return (
            <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
            {children}
            </th>
        );
        },
        td({ children }) {
        return (
            <td className="break-words border border-black px-3 py-1 dark:border-white">
            {children}
            </td>
        );
        },
        a: ({ href, children, ...props }) => {
          return (
              <a href={href} className="text-[#76b900] no-underline hover:underline" {...props}>
                  {children}
              </a>
          );
        },
        p: ({ node, children, ...props }) => (
          <p style={{ marginBottom: '-0.5rem' }} {...props}>
            {children}
          </p>
        ),
        img: ({ src, alt, ...props }) => {
          // Check if src is a base64 encoded image
          const isBase64 = src?.includes('data:image');
        
          // Setting a default width and height can prevent layout shifts
          const defaultStyle = {
            maxWidth: '100%',
            maxHeight: 'auto',
          };
        
          // Modify additional styles if src is a base64 image
          const base64Style = isBase64 ? { width: '100%', height: 'auto' } : {};
        
          return (
            <img 
              src={src}
              alt={alt || 'image'}  // Provide an alt if not specified
              style={{ ...defaultStyle, ...base64Style }}
              {...props}
              className={`object-cover rounded-lg border border-slate-400 shadow-sm ${props.className || ''}`}
            />
          );
        }
  
    }
}
    