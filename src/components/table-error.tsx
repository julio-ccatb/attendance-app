import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TableErrorProps {
  message: string
  onRetry: () => void
}

export default function TableError({ message, onRetry }: TableErrorProps) {
  return (
    <div className="w-full py-10">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <div className="flex justify-center">
        <Button onClick={onRetry} variant="outline" className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    </div>
  )
}