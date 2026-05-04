type RichTextProps = {
  content: string
  strongClass?: string
}

export function RichText({ content, strongClass = 'font-semibold text-forest' }: RichTextProps) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\*\*(.+)\*\*$/)
        if (match) {
          return (
            <strong key={index} className={strongClass}>
              {match[1]}
            </strong>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}
