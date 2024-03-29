"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { getDebounce } from "@/actions/getDebounced";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = getDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams?.get("categoryId");

  const haveCategoryId = !!searchParams?.get("categoryId");
  const haveTitle = !!searchParams?.get("title");
  const disableFilter = haveTitle || haveCategoryId;


  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname || "/project",
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId,router, pathname])

  return (
    <div className="flex items-center justify-center flex-row gap-2">
      <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
        <Input 
          onChange={(e:any) => setValue(e.target.value)}
          value={value}
          className="w-full md:w-[500px] pl-9 rounded-full focus-visible:ring-slate-400" 
          placeholder="Search for a project"
          />
      </div>

      {disableFilter &&
        <Button
          onClick={() => {router.push("/project")}}
        >
          Remove Filter
        </Button>
      }
    </div>
  )
}