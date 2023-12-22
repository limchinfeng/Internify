interface ListingIdTitle {
  title: string;
  category: string;
}

export const ListingIdTitle = ({
  title, category
}: ListingIdTitle) => {
  return (
    <div className="flex flex-col gap-1">
      <h1>
        {title}
      </h1>
      <p>
        {category}
      </p>
    </div>
  )
}