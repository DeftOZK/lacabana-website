from pathlib import Path

from django.template.loaders.filesystem import Loader as FilesystemLoader


class LenientFilesystemLoader(FilesystemLoader):
    def get_contents(self, origin):
        try:
            return super().get_contents(origin)
        except UnicodeDecodeError:
            return Path(origin.name).read_text(encoding="latin-1")
