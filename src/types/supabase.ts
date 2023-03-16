export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      company: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean
          name?: string
          owner_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean
          name?: string
          owner_id?: string
        }
      }
      question_type: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          title?: string | null
        }
      }
      survey: {
        Row: {
          colour: string | null
          company_id: number
          created_at: string | null
          id: number
          starter_image: string | null
          title: string | null
        }
        Insert: {
          colour?: string | null
          company_id: number
          created_at?: string | null
          id?: number
          starter_image?: string | null
          title?: string | null
        }
        Update: {
          colour?: string | null
          company_id?: number
          created_at?: string | null
          id?: number
          starter_image?: string | null
          title?: string | null
        }
      }
      survey_answer: {
        Row: {
          buy_again: boolean | null
          company: number
          id: number
          rating: number | null
          rating_input: string | null
          submitted_at: string | null
          survey: number
          values: string[] | null
        }
        Insert: {
          buy_again?: boolean | null
          company: number
          id?: number
          rating?: number | null
          rating_input?: string | null
          submitted_at?: string | null
          survey: number
          values?: string[] | null
        }
        Update: {
          buy_again?: boolean | null
          company?: number
          id?: number
          rating?: number | null
          rating_input?: string | null
          submitted_at?: string | null
          survey?: number
          values?: string[] | null
        }
      }
      survey_question: {
        Row: {
          buy_again_img: string | null
          company: number
          created_at: string | null
          description: string | null
          discount_code: string | null
          id: number
          question_type: number
          sort_order: number | null
          start_img: string | null
          survey: number
          title: string | null
        }
        Insert: {
          buy_again_img?: string | null
          company: number
          created_at?: string | null
          description?: string | null
          discount_code?: string | null
          id?: number
          question_type: number
          sort_order?: number | null
          start_img?: string | null
          survey: number
          title?: string | null
        }
        Update: {
          buy_again_img?: string | null
          company?: number
          created_at?: string | null
          description?: string | null
          discount_code?: string | null
          id?: number
          question_type?: number
          sort_order?: number | null
          start_img?: string | null
          survey?: number
          title?: string | null
        }
      }
      user_profile: {
        Row: {
          company_id: number | null
          created_at: string | null
          fname: string | null
          id: string
          is_active: boolean
          lname: string | null
          profile_img: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          fname?: string | null
          id: string
          is_active?: boolean
          lname?: string | null
          profile_img?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          fname?: string | null
          id?: string
          is_active?: boolean
          lname?: string | null
          profile_img?: string | null
        }
      }
      value: {
        Row: {
          company: number
          created_at: string | null
          id: number
          is_default: boolean
          survey: number
          title: string | null
        }
        Insert: {
          company: number
          created_at?: string | null
          id?: number
          is_default?: boolean
          survey: number
          title?: string | null
        }
        Update: {
          company?: number
          created_at?: string | null
          id?: number
          is_default?: boolean
          survey?: number
          title?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
