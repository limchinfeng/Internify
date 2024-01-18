interface ListingIdSummaryProps {
  summary: string
}

export const ListingIdSummary = ({
  summary
}: ListingIdSummaryProps) => {
  return (
  <div className="w-full lg:w-4/5 rounded-xl p-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
    <div className="rounded-lg bg-white p-6 flex flex-col gap-2 text-justify ">
      <h1 className="text-lg text-black text-bold">
        Internify AI Summary
      </h1>
      {summary ? <>
        <p>
          {summary}
        </p>
      </> : <>
        <p>
          Oops something went wrong
        </p>
      </>}
    </div>
  </div>
  )
}