"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { getDebounce } from "@/actions/getDebounced";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

export const states = [
  {
    label: "Johor"
  },
  {
    label: "Kedah"
  },
  {
    label: "Kelatan"
  },
  {
    label: "Malacca"
  },
  {
    label: "Negeri Sembilan"
  },
  {
    label: "Pahang"
  },
  {
    label: "Penang"
  },
  {
    label: "Perak"
  },
  {
    label: "Perlis"
  },
  {
    label: "Sabah"
  },
  {
    label: "Sarawak"
  },
  {
    label: "Selangor"
  },
  {
    label: "Terengganu"
  },
]

export const ListingSearchInput = () => {
  const [value, setValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const debouncedValue = getDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams?.get("categoryId");

  const haveCategoryId = !!searchParams?.get("categoryId");
  const haveTitle = !!searchParams?.get("title");
  const haveState = !!searchParams?.get("state");
  const disableFilter = haveState || haveTitle || haveCategoryId;

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname || "/listing",
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
        state: stateValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId,router, pathname, stateValue])

  return (
    <div className="flex items-center justify-center flex-row gap-2">
      <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
        <Input 
          onChange={(e:any) => setValue(e.target.value)}
          value={value}
          className="w-full md:w-[500px] pl-9 rounded-full focus-visible:ring-slate-400" 
          placeholder="Search for a listing"
          />
      </div>
      <div>
        <Combobox 
          value={stateValue}
          onChange={(selectedState) => setStateValue(selectedState)}
          options={states.map((state) => ({
            label: state.label,
            value: state.label
          }))}
        />
      </div>

      {disableFilter &&
        <Button
          onClick={() => {
            setStateValue("");
            router.push("/listing");
          }}
        >
          Remove Filter
        </Button>
      }
    </div>
  )
}