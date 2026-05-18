import Link from "next/link";

import DeleteDialog from "@/components/shared/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteWebPage, getAllWebPages } from "@/lib/actions/web-page.actions";
import { IWebPage } from "@/lib/db/models/web-page.model";
import { formatId } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export const metadata: Metadata = {
  title: "Admin Web Pages",
};

export default async function WebPageAdminPage() {
  const webPages = await getAllWebPages();
  const t = await getTranslations("Admin");
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h1-bold">{t("Web Pages")}</h1>
        <Button asChild variant="default">
          <Link href="/admin/web-pages/create">
            {t("Form.Create Web Page")}
          </Link>
        </Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{t("Form.Id")}</TableHead>
              <TableHead>{t("Form.Name")}</TableHead>
              <TableHead>{t("Form.Slug")}</TableHead>
              <TableHead>{t("Form.Is Published")}</TableHead>
              <TableHead className="w-[100px]">{t("Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webPages.map((webPage: IWebPage) => (
              <TableRow key={webPage._id.toString()}>
                <TableCell>{formatId(webPage._id.toString())}</TableCell>
                <TableCell>{webPage.title}</TableCell>
                <TableCell>{webPage.slug}</TableCell>
                <TableCell>
                  {webPage.isPublished ? t("Form.Yes") : t("Form.No")}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/web-pages/${webPage._id}`}>
                      {t("Form.Actions.Edit")}
                    </Link>
                  </Button>
                  <DeleteDialog
                    id={webPage._id.toString()}
                    action={deleteWebPage}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
