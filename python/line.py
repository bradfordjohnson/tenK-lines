import os
import json

class LineProgress:
    """
    A class used to count the number of lines in each file in a directory.

    ...

    Attributes
    ----------
    directory : str
        a formatted string to print out the directory where the files are located

    Methods
    -------
    list_files(directory=None)
        Counts the number of lines in each file in a directory and returns a dictionary with file paths as keys and line counts as values.
    """

    def __init__(self, directory):
        """
        Constructs all the necessary attributes for the LineProgress object.

        Parameters
        ----------
            directory : str
                the directory where the files are located
        """
        self.directory = directory

    def list_files(self, directory=None):
        """
        Counts the number of lines in each file in a directory and returns a dictionary with file paths as keys and line counts as values.

        If no directory is provided, the method uses the directory passed to the constructor.

        Parameters
        ----------
            directory : str, optional
                the directory where the files are located (default is None which implies the directory passed to the constructor)

        Returns
        -------
        dict
            a dictionary where the keys are the file paths and the values are the line counts

        Example
        -------
        >>> line_progress = LineProgress('python')
        >>> files_dict = line_progress.list_files()
        >>> print(files_dict)
        {'python/file1.py': 100, 'python/file2.py': 200, ...}
        """
        if directory is None:
            directory = self.directory

        file_line_count_dict = {}
        for path in os.listdir(directory):
            full_path = os.path.join(directory, path)
            if os.path.isdir(full_path):
                file_line_count_dict.update(self.list_files(full_path))
            else:
                with open(full_path, "r") as file:
                    line_count = sum(1 for _ in file if _.strip())
                file_line_count_dict[full_path.replace("\\", "/")] = line_count

        return file_line_count_dict


language_directories = ["python", "r", "javascript"]
language_statistics = []

for directory in language_directories:
    line_progress = LineProgress(directory)
    files_dict = line_progress.list_files()
    language_statistics.append(
        {
            "language": directory,
            "stats": [
                {
                    "file": file_path,
                    "lines": lines
                }
                
                for file_path, lines in files_dict.items()
            ],
        }
    )

json.dump(language_statistics, open("./language_statistics.json", "w"), indent=2)